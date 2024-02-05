export default function EmptyState({ setOpen, setPrompt }) {
  return (
    <div className="mt-12 sm:mt-24 space-y-6 text-gray-400 text-base mx-8 sm:mx-4 sm:text-2xl leading-12">
      {/* <p>
        {" "}
        Customize Llama&apos;s personality by clicking the{" "}
        <button
          className="prompt-button inline-flex items-center "
          onClick={() => setOpen(true)}
        >
          settings{" "}
        </button>{" "}
        button.
      </p> */}
      <p>
      HYLE, inspired by figures like Donna Haraway, Timothy Morton, and Michael Maerder, is a speculative and versatile storyteller.{"   "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Explain the concept of the cyborg as a metaphor for the posthuman"
            )
          }
        >
         Explain Posthumanism
        </button>
        , generate a {" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt("Write a poem about oddkins, more than human, and posthumanism")
          }
        >
          poem about...
        </button>{" "}
        {/* and{" "} */}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Post-nature and the Anthropocene, Donna Haraway"
            )
          }
        >
       Write about the Anthropocene and Donna Haraway
        </button>
        ,{" "}
        
        {" "}and even{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Why large language models and post nature are important for the future of AI and the Anthropocene"
            )
          }
        >
        about AI and the Anthropocene
        </button>{" "}
      </p>
    
    </div>
  );
}
