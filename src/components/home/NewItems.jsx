import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardsPerPage = 3;
  const maxIndex = Math.max(collections.length - cardsPerPage, 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/newItems`);
        setCollections(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching new items:", err);
        setError(err.message || "Failed to load new items");
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);
  if (loading) return <section id="section-items" className="no-bottom"><div className="container"><p>Loading...</p></div></section>;
  if (error) return <section id="section-items" className="no-bottom"><div className="container"><p>Error: {error}</p></div></section>;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
            <div className="col-lg-12">
            <div className="text-center" style={{ position: "relative" }}>
              {currentIndex > 0 && (
                <button className="prev" onClick={handlePrev} aria-label="Previous">‹</button>
              )}
              {currentIndex < maxIndex && (
                <button className="next" onClick={handleNext} aria-label="Next">›</button>
              )}
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {collections.map((collection, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${collection.author}`}
                  >
                    <img className="lazy" src={AuthorImage} alt={collection.author} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={collection.image}
                      className="lazy nft__item_preview"
                      alt={collection.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{collection.title}</h4>
                  </Link>
                  <div className="nft__item_price">{collection.type}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
