const FAQ = () => {
  const questions = [
    {
      q: "What do I need to rent a car?",
      a: "You need a valid driving licence and the required identification documents.",
    },
    {
      q: "How old do I have to be?",
      a: "Minimum age requirements depend on the vehicle and owner.",
    },
    {
      q: "Can I book a rental car for someone else?",
      a: "Yes, depending on the booking requirements.",
    },
    {
      q: "How do I find the cheapest car rental deal?",
      a: "Compare vehicles, prices and rental periods before booking.",
    },
    {
      q: "What should I look for when choosing a car?",
      a: "Consider the number of passengers, luggage, rental duration and your destination.",
    },
  ];

  return (
    <section className="bg-canvas py-24">

      <div className="mx-auto max-w-3xl px-6">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 divide-y divide-gray-200 rounded-3xl bg-white px-6">

          {questions.map((item) => (
            <details
              key={item.q}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {item.q}

                <span className="text-xl transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
                {item.a}
              </p>
            </details>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;