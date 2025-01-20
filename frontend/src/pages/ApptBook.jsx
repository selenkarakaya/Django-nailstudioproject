import ApptForm from "../components/ApptForm";

function ApptBook() {
  return (
    <div>
      <section className="flex flex-col items-center">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
        <p>
          <h1 className="mb-4">Fresh Nail • Fresh You</h1>
        </p>
      </section>
      <ApptForm />
    </div>
  );
}

export default ApptBook;
