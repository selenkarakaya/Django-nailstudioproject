import Title from "../components/Title";

function Checkout() {
  Title("Adress & Payment");
  return (
    <>
      <h1 className="text-3xl text-center">Checkout</h1>
      <div className="flex justify-center space-x-4 mx-10 bg-lightBg p-10 border-b border-gray-900/10 rounded-lg">
        <form className="flex-1">
          <div className="space-y-12">
            <div className=" pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    className="block text-gray-800 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-gray-800 font-bold mb-2"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex-1">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
              <div className="w-full px-6 py-8 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
                <p className="mt-4 text-gray-600">
                  Please fill out the form below to complete your purchase.
                </p>
                <form className="mt-6">
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="name"
                    >
                      Cardholder Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="card_number"
                    >
                      Card Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="card_number"
                      type="text"
                      placeholder="**** **** **** 1234"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="expiration_date"
                    >
                      Expiration Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiration_date"
                      type="text"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cvv"
                      type="text"
                      placeholder="***"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Complete purchase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
