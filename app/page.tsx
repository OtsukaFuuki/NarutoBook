/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

//１ページあたりに表示するデータの個数
const limit = 15;

const page = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiURL = "https://narutodb.xyz/api/character";
    setIsLoading(true);

    const result = await axios.get(apiURL, { params: { page, limit } });
    setCharacters(result.data.characters);
    setIsLoading(false);
    console.log(result);
  };
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };
  const handlePrev = async () => {
    const nextPage = page - 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  return (
    <div>
      {isLoading ? (
        <div>NowLoading...</div>
      ) : (
        <div>
          <div className="">
            {characters.map((character) => {
              return (
                <div key={character.id}>
                  <img
                    src={character.images[0] ?? "noimg.png"}
                    alt="character"
                  />
                  <p>名前:{character.name ?? "データ不足"}</p>
                  <p>
                    デビューアニメ:
                    {character.debut?.movie != null
                      ? character.debut?.movie
                      : "データ不足"}
                  </p>
                  <p>
                    術:
                    {character?.jutsu ?? "データ不足"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="p-3 bg-black text-white"
              onClick={handlePrev}
              disabled={page === 1}
            >
              pre
            </button>
            <span className="px-4">{page}</span>
            <button
              className="p-3 bg-black text-white"
              onClick={handleNext}
              disabled={limit > characters.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
