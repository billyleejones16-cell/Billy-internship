import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/hotCollections`);
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hot collections:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  if (loading) return <section id="section-collections" className="no-bottom"><div className="container"><p>Loading...</p></div></section>;
  if (error) return <section id="section-collections" className="no-bottom"><div className="container"><p>Error: {error}</p></div></section>;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {collections.map((collection, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.image || nftImage} className="lazy img-fluid" alt={collection.name} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt={collection.authorName} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.name}</h4>
                  </Link>
                  <span>{collection.code || "ERC-192"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
