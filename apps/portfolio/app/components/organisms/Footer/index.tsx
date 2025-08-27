export const Footer = () => {
  return (
    <footer className="bg-footer-background text-white p-4 py-8 md:p-8 md:py-12 flex justify-around text-sm md:text-base">
      <p>
        Developed by <span className="font-bold">Alan Núñez</span> @2025
      </p>
      <div>
        Inspired on{' '}
        <a
          href="https://shtheme.com/demosd/dizme/?page_id=53"
          target="_blank"
          rel="dizme page"
          className="hover:text-primary transition-colors duration-300"
        >
          Dizme
        </a>
      </div>
    </footer>
  );
};
