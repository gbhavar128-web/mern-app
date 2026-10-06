const scrollToProducts = () =>
  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  return (
    <article id="top">
      <div className="col-1">
        <div>
          <div className="btn-container">
            <div className="article-button">
              <span className="bi bi-lightning-fill" /> New Collection 2032
            </div>
            <div className="article-title">Step Into <br /><span>Your Best</span></div>
            <div className="article-text">
              Premium footwear for every step of your journey. From athletic performance to everyday comfort.
            </div>
          </div>
          <div>
            <button className="btn-shop" onClick={scrollToProducts}>
              Shop Now <span className="bi bi-arrow-right" />
            </button>
            <button className="btn-browse" onClick={scrollToProducts}>Browse Categories</button>
          </div>
          <div className="article-facts">
            <div>50K+<div className="fact-text">Happy Customers</div></div>
            <div>4.9 <span className="bi bi-star-fill" /><div className="fact-text">Average Rating</div></div>
            <div>300+<div className="fact-text">Styles Available</div></div>
          </div>
        </div>
      </div>
      <div className="col-2">
        <img className="article-image" alt="Featured shoe"
          src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60" />
      </div>
    </article>
  );
}
