const Footer = () => {
  return (
    <footer className="bg-ink text-white">

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-4">

<div className="md:col-span-2">
<div className="flex items-center gap-3">
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F46E5] font-extrabold text-[#3cff00] shadow-md">
BV
</div>
 
<div className="flex flex-col leading-none">
<span className="text-xl font-bold text-white">
Bon Voyage
</span>
 
<span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
Car Rentals
</span>
</div>
</div>
 
<p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
Premium car rentals designed for comfort, flexibility,
and unforgettable journeys across India. Your next
adventure starts with Bon Voyage.
</p>
</div>

          <div>
            <h3 className="font-semibold">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/50">
              <a href="/">Home</a>
              <a href="/cars">Cars</a>
              <a href="/my-bookings">My bookings</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/50">
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-sm text-white/40">
          © {new Date().getFullYear()} Mirror. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;