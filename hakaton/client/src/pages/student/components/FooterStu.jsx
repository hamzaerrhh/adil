const FooterStu = () => {
  const logo =
    "https://www.laformation.ma/images/300/eco-kpckyi51pm4vfrxwu4safg10gw4vsy01022016013052.jpg";
  return (
    <footer className="bg-gray-950 text-white px-10 py-8">
      <div className="flex justify-evenly">
        <div className=" relative">
          <iframe
            className=" rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.1789972359966!2d-1.8963589746444285!3d34.65018217293758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd787ca31c44b0b3%3A0x49a225623fcafd20!2z2KzYp9mF2LnYqSDZhdit2YXYryDYp9mE2KPZiNmE!5e0!3m2!1sar!2sma!4v1712361632894!5m2!1sar!2sma"
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">Home</li>
            <li className="mb-2">Services</li>
            <li className="mb-2">About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Get in Touch</h2>
          <p className="mt-2">Email: info@szcurity.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p>All rights reserved &copy; 2024 Szcurity</p>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-mono">university mohamed 1</p>
          <img src={logo} alt="Szcurity Logo" className="w-32 h-32" />
        </div>
        <p>Location: University Mohamed 1, Morocco</p>
      </div>
    </footer>
  );
};

export default FooterStu;
