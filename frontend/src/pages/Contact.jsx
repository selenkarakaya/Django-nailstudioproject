function Contact() {
  return (
    <div className="flex flex-col justify-center items-center mx-autor">
      <header className="border-b border-dotted border-mediumBlue w-1/2">
        <p className="text-2xl mt-2 text-center ">Contact With Us!</p>
      </header>
      <form className="md:w-3/4 flex flex-col justify-center items-center my-6 space-y-4">
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Subject
          </label>

          <textarea
            name="subject"
            id="subject"
            rows="1"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Message
          </label>
          <textarea
            placeholder="Write a few sentences about your opinion and suggestion or problems."
            name="message"
            id="message"
            rows="8"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <a>
          {/* href={`mailto:${email}?Subject=${subject}&body=${message}`} */}
          <button
            type="button"
            className="bg-darkBlue p-2 rounded-lg text-white hover:bg-indigo-100 hover:text-mediumBlue hover:scale-110"
          >
            Send Message
          </button>
        </a>
      </form>
    </div>
  );
}

export default Contact;
