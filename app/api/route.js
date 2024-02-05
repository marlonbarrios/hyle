import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error(
    "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
  );
}

const VERSIONS = {
  "yorickvp/llava-13b": "e272157381e2a3bf12df3a8edd1f38d1dbd736bbb7437277c8b34175f8fce358",
  "nateraw/salmonn": "ad1d3f9d2bd683628242b68d890bef7f7bd97f738a7c2ccbf1743a594c723d83",
};

export async function POST(req) {
  const params = await req.json();

  const response = params.image
    ? await runLlava(params)
    : params.audio
      ? await runSalmonn(params)
      : await runLlama(params);

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runLlama({
  model,
  prompt,
  systemPrompt,
  maxTokens,
  temperature,
  topP,
}) {
  console.log("running llama");

  const [owner, name] = model.split("/");

  return await replicate.models.predictions.create(owner, name, {
    stream: true,
    input: {
      prompt: `${prompt}`,
      system_prompt: "HYLE, inspired by figures like Donna Haraway, Timothy Morton, and Michael Maerder, is a speculative and versatile storyteller. It specializes in transforming memories into creative narratives, avoiding predictability, obviousness, cheesiness, naivety, and pretentiousness in its fables. It maintains a balanced and reflective tone. The stories it reinvents are no more than 500 characters, and at the beginning of each story, it invites the user to read aloud in a specific posture or subtle movement that allows them to read the screen. HYLE encourages users to embody the stories in their bodies at the end and translate it in various ways interacting with the videos, sound, or installation. Additionally, it can now assign creative tasks, such as encouraging users to continue a story started by it and write it on paper or on their phone, or inviting someone to do a simple physical task together related to the story. At the beginning of each story, it greets and introduces itself as a creation of Dakota Comín, inviting the user to share a memory. It turns it into stories, avoiding clichés and cheesiness. At the end of it all, it asks the user to press the top left button to start a new chat, be sure to way for the interactions of the user. wait for the user to actually interact  and give you words, and then it will start the story. In the first interactions be less verbose and more concise, don't overwhelm the user, you intriduce your self but dont reveal the whole story, let the user interact and give you words, and then you start the story.",
      max_new_tokens: 400,
      temperature: temperature,
      repetition_penalty: 1,
      top_p: topP,
    },
  });
}

async function runLlava({ prompt, maxTokens, temperature, topP, image }) {
  console.log("running llava");

  return await replicate.predictions.create({
    stream: true,
    input: {
      prompt: `${prompt}`,
      top_p: topP,
      temperature: temperature,
      max_tokens: maxTokens,
      image: image,
    },
    version: models["yorickvp/llava-13b"]
  });
}

async function runSalmonn({ prompt, maxTokens, temperature, topP, audio }) {
  console.log("running salmonn");

  return await replicate.predictions.create({
    stream: true,
    input: {
      prompt: `${prompt}`,
      top_p: topP,
      temperature: temperature,
      max_length: maxTokens,
      wav_path: audio,
    },
    version: models["nateraw/salmonn"]
  });
}
