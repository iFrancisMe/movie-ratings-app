
export default class MovieData {

    #ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2ZmZGU1MTlhZGM3OWRiNDU0N2JjMmRjMDUwN2RjZiIsInN1YiI6IjY1ZmE5MTY2MGJjNTI5MDE3Y2FlMjlkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YNPuitx3WkXXYHxGlFD5oKGDvOr47jA-AA0OeuMMSm0';
    #API_KEY = '53ffde519adc79db4547bc2dc0507dcf';


    constructor() {
        this.movieData = [];
        this.reviewData = [];
    }

    submitReview(id, reviewObj) {

      let template = {
        id: id,
        results: [reviewObj]
      }

      let movieIndex = this.reviewData.findIndex(movie => {
        return movie.id === id;
      });

      if (movieIndex !== undefined && movieIndex > 0) {
        this.reviewData[movieIndex].results.push(reviewObj);
      } else {
        this.reviewData.push(template);
      }

    }

    configuration() {
        // Not implemented yet
    }

    getWhatsPlaying() { // Not implemented yet
        //let url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    }

    getLocalReviews(movieID) {
      
      let movieIndex = this.reviewData.findIndex(movie => {
        return movie.id === movieID;
      });
      
      if ( movieIndex >= 0) {

        return this.reviewData[movieIndex]
          
      } else {
        return {
            id: movieID,
            results: []
        };
      }

    }

    async getReviews(id) {
        
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${this.#ACCESS_TOKEN}`
            }
          };

        const response = await fetch(apiUrl, options)
            .then(res => res.json())
        
        return response;
        
    } 

    // Returns assembled URL path to resource, such as backdrop images or posters
    getResource(url, resourceType = 'poster', sizeIndex = 0) {

        if (url === undefined || url.startsWith('/') === false) {
            return undefined;
        }

        let configMethod = this.getSampleConfiguration;
        let configData = configMethod().images;
        let resourceKeys = configData[resourceType + '_sizes'];

        if (resourceKeys instanceof Array === false) {
            return undefined
        }

        let sizeResourceName = resourceKeys[sizeIndex];

        let resourceURL = configData.secure_base_url + sizeResourceName + url;

        return resourceURL;
    }

    // Taken from TMDB API get request as a sample set of data. Configuration API is used for building URL path to resources.
    getSampleConfiguration() {
        return {
            "images": {
              "base_url": "http://image.tmdb.org/t/p/",
              "secure_base_url": "https://image.tmdb.org/t/p/",
              "backdrop_sizes": [
                "w300",
                "w780",
                "w1280",
                "original"
              ],
              "logo_sizes": [
                "w45",
                "w92",
                "w154",
                "w185",
                "w300",
                "w500",
                "original"
              ],
              "poster_sizes": [
                "w92",
                "w154",
                "w185",
                "w342",
                "w500",
                "w780",
                "original"
              ],
              "profile_sizes": [
                "w45",
                "w185",
                "h632",
                "original"
              ],
              "still_sizes": [
                "w92",
                "w185",
                "w300",
                "original"
              ]
            },
            "change_keys": [
              "adult",
              "air_date",
              "also_known_as",
              "alternative_titles",
              "biography",
              "birthday",
              "budget",
              "cast",
              "certifications",
              "character_names",
              "created_by",
              "crew",
              "deathday",
              "episode",
              "episode_number",
              "episode_run_time",
              "freebase_id",
              "freebase_mid",
              "general",
              "genres",
              "guest_stars",
              "homepage",
              "images",
              "imdb_id",
              "languages",
              "name",
              "network",
              "origin_country",
              "original_name",
              "original_title",
              "overview",
              "parts",
              "place_of_birth",
              "plot_keywords",
              "production_code",
              "production_companies",
              "production_countries",
              "releases",
              "revenue",
              "runtime",
              "season",
              "season_number",
              "season_regular",
              "spoken_languages",
              "status",
              "tagline",
              "title",
              "translations",
              "tvdb_id",
              "tvrage_id",
              "type",
              "video",
              "videos"
            ]
          }
    }

    // Taken from TMDB API get request as a sample set of data. Main API for retrieving movie data.
    getSampleData() {
        return {
            "dates": {
              "maximum": "2024-03-27",
              "minimum": "2024-02-14"
            },
            "page": 1,
            "results": [
              {
                "adult": false,
                "backdrop_path": "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
                "genre_ids": [
                  28,
                  12,
                  16,
                  35,
                  10751
                ],
                "id": 1011985,
                "original_language": "en",
                "original_title": "Kung Fu Panda 4",
                "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
                "popularity": 4814.65,
                "poster_path": "/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg",
                "release_date": "2024-03-02",
                "title": "Kung Fu Panda 4",
                "video": false,
                "vote_average": 6.918,
                "vote_count": 255
              },
              {
                "adult": false,
                "backdrop_path": "/zAepSrO99owYwQqi0QG2AS0dHXw.jpg",
                "genre_ids": [
                  28,
                  14
                ],
                "id": 634492,
                "original_language": "en",
                "original_title": "Madame Web",
                "overview": "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
                "popularity": 2483.029,
                "poster_path": "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
                "release_date": "2024-02-14",
                "title": "Madame Web",
                "video": false,
                "vote_average": 5.546,
                "vote_count": 689
              },
              {
                "adult": false,
                "backdrop_path": "/deLWkOLZmBNkm8p16igfapQyqeq.jpg",
                "genre_ids": [
                  9648,
                  14,
                  28,
                  12
                ],
                "id": 763215,
                "original_language": "en",
                "original_title": "Damsel",
                "overview": "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
                "popularity": 1398.123,
                "poster_path": "/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg",
                "release_date": "2024-03-08",
                "title": "Damsel",
                "video": false,
                "vote_average": 7.18,
                "vote_count": 1078
              },
              {
                "adult": false,
                "backdrop_path": "/mDeUmPe4MF35WWlAqj4QFX5UauJ.jpg",
                "genre_ids": [
                  28,
                  27,
                  53
                ],
                "id": 1096197,
                "original_language": "pt",
                "original_title": "No Way Up",
                "overview": "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
                "popularity": 849.33,
                "poster_path": "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
                "release_date": "2024-01-18",
                "title": "No Way Up",
                "video": false,
                "vote_average": 6.139,
                "vote_count": 270
              },
              {
                "adult": false,
                "backdrop_path": "/xvk5AhfhgQcTuaCQyq3XqAnhEma.jpg",
                "genre_ids": [
                  28,
                  12,
                  35
                ],
                "id": 848538,
                "original_language": "en",
                "original_title": "Argylle",
                "overview": "When the plots of reclusive author Elly Conway's fictional espionage novels begin to mirror the covert actions of a real-life spy organization, quiet evenings at home become a thing of the past. Accompanied by her cat Alfie and Aiden, a cat-allergic spy, Elly races across the world to stay one step ahead of the killers as the line between Conway's fictional world and her real one begins to blur.",
                "popularity": 827.115,
                "poster_path": "/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg",
                "release_date": "2024-01-31",
                "title": "Argylle",
                "video": false,
                "vote_average": 6.141,
                "vote_count": 676
              },
              {
                "adult": false,
                "backdrop_path": "/1ZSKH5GGFlM8M32K34GMdaNS2Ew.jpg",
                "genre_ids": [
                  10402,
                  36,
                  18
                ],
                "id": 802219,
                "original_language": "en",
                "original_title": "Bob Marley: One Love",
                "overview": "Jamaican singer-songwriter Bob Marley overcomes adversity to become the most famous reggae musician in the world.",
                "popularity": 819.473,
                "poster_path": "/4eWeXswkAUIvdVWFvPrUFu2TxuI.jpg",
                "release_date": "2024-02-14",
                "title": "Bob Marley: One Love",
                "video": false,
                "vote_average": 6.978,
                "vote_count": 337
              },
              {
                "adult": false,
                "backdrop_path": "/87IVlclAfWL6mdicU1DDuxdwXwe.jpg",
                "genre_ids": [
                  878,
                  12
                ],
                "id": 693134,
                "original_language": "en",
                "original_title": "Dune: Part Two",
                "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
                "popularity": 736.807,
                "poster_path": "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
                "release_date": "2024-02-27",
                "title": "Dune: Part Two",
                "video": false,
                "vote_average": 8.401,
                "vote_count": 2021
              },
              {
                "adult": false,
                "backdrop_path": "/47olX0FCvUCfAqlp8cK0O5fKLav.jpg",
                "genre_ids": [
                  16,
                  35,
                  878
                ],
                "id": 1239251,
                "original_language": "en",
                "original_title": "Megamind vs. the Doom Syndicate",
                "overview": "Megamind's former villain team, The Doom Syndicate, has returned. Our newly crowned blue hero must now keep up evil appearances until he can assemble his friends (Roxanne, Ol' Chum and Keiko) to stop his former evil teammates from launching Metro City to the Moon.",
                "popularity": 705.329,
                "poster_path": "/yRZfiG1QpRkBc7fAmxfcR7Md5EC.jpg",
                "release_date": "2024-03-01",
                "title": "Megamind vs. the Doom Syndicate",
                "video": false,
                "vote_average": 5.667,
                "vote_count": 132
              },
              {
                "adult": false,
                "backdrop_path": "/gklkxY0veMajdCiGe6ggsh07VG2.jpg",
                "genre_ids": [
                  16,
                  28,
                  12,
                  35,
                  10751
                ],
                "id": 940551,
                "original_language": "en",
                "original_title": "Migration",
                "overview": "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
                "popularity": 704.837,
                "poster_path": "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
                "release_date": "2023-12-06",
                "title": "Migration",
                "video": false,
                "vote_average": 7.545,
                "vote_count": 981
              },
              {
                "adult": false,
                "backdrop_path": "/qVrS8bu1B7G1tgLTlCZQi4CFsTh.jpg",
                "genre_ids": [
                  28,
                  53,
                  10752
                ],
                "id": 969492,
                "original_language": "en",
                "original_title": "Land of Bad",
                "overview": "When a Delta Force special ops mission goes terribly wrong, Air Force drone pilot Reaper has 48 hours to remedy what has devolved into a wild rescue operation. With no weapons and no communication other than the drone above, the ground mission suddenly becomes a full-scale battle when the team is discovered by the enemy.",
                "popularity": 651.355,
                "poster_path": "/h3jYanWMEJq6JJsCopy1h7cT2Hs.jpg",
                "release_date": "2024-01-25",
                "title": "Land of Bad",
                "video": false,
                "vote_average": 7.079,
                "vote_count": 399
              },
              {
                "adult": false,
                "backdrop_path": "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
                "genre_ids": [
                  878,
                  10749,
                  35
                ],
                "id": 792307,
                "original_language": "en",
                "original_title": "Poor Things",
                "overview": "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
                "popularity": 622.887,
                "poster_path": "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
                "release_date": "2023-12-07",
                "title": "Poor Things",
                "video": false,
                "vote_average": 7.9,
                "vote_count": 2587
              },
              {
                "adult": false,
                "backdrop_path": "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
                "genre_ids": [
                  28,
                  878,
                  12
                ],
                "id": 823464,
                "original_language": "en",
                "original_title": "Godzilla x Kong: The New Empire",
                "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
                "popularity": 622.407,
                "poster_path": "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
                "release_date": "2024-03-27",
                "title": "Godzilla x Kong: The New Empire",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
              },
              {
                "adult": false,
                "backdrop_path": "/cu5Qk2QHxOyyMrD3Bq93DxgmJer.jpg",
                "genre_ids": [
                  28,
                  80
                ],
                "id": 1046090,
                "original_language": "zh",
                "original_title": "周處除三害",
                "overview": "The arrogant, third most-wanted criminal in Taiwan, decides to get rid of the top two competitors and crowns himself the most-wanted criminal before dying.",
                "popularity": 617.369,
                "poster_path": "/7IJ7F8tX7IAkpUdaGovOBJqORnJ.jpg",
                "release_date": "2023-10-06",
                "title": "The Pig, the Snake and the Pigeon",
                "video": false,
                "vote_average": 7.48,
                "vote_count": 101
              },
              {
                "adult": false,
                "backdrop_path": "/ekRp1sEA8pnuzVHQkUESTgNSKdW.jpg",
                "genre_ids": [
                  878,
                  28,
                  80
                ],
                "id": 932420,
                "original_language": "en",
                "original_title": "Code 8 Part II",
                "overview": "In a world where superpowered people are heavily policed by robots, an ex-con teams up with a drug lord he despises to protect a teen from a corrupt cop.",
                "popularity": 602.265,
                "poster_path": "/hhvMTxlTZtnCOe7YFhod9uz3m37.jpg",
                "release_date": "2024-02-27",
                "title": "Code 8 Part II",
                "video": false,
                "vote_average": 6.5,
                "vote_count": 336
              },
              {
                "adult": false,
                "backdrop_path": "/nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg",
                "genre_ids": [
                  10749,
                  35
                ],
                "id": 1072790,
                "original_language": "en",
                "original_title": "Anyone But You",
                "overview": "After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia. So they do what any two mature adults would do: pretend to be a couple.",
                "popularity": 500.903,
                "poster_path": "/5qHoazZiaLe7oFBok7XlUhg96f2.jpg",
                "release_date": "2023-12-21",
                "title": "Anyone But You",
                "video": false,
                "vote_average": 7.087,
                "vote_count": 1085
              },
              {
                "adult": false,
                "backdrop_path": "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
                "genre_ids": [
                  18,
                  36
                ],
                "id": 872585,
                "original_language": "en",
                "original_title": "Oppenheimer",
                "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
                "popularity": 417.887,
                "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                "release_date": "2023-07-19",
                "title": "Oppenheimer",
                "video": false,
                "vote_average": 8.114,
                "vote_count": 7328
              },
              {
                "adult": false,
                "backdrop_path": "/9JNsAIFMu4o37AgnU1JVtR6AWsK.jpg",
                "genre_ids": [
                  10749,
                  28,
                  18
                ],
                "id": 1248795,
                "original_language": "tr",
                "original_title": "Romantik Hırsız",
                "overview": "After learning that the art thief she has been chasing is her ex-lover, an officer working for Interpol concocts a plan to catch him red-handed.",
                "popularity": 390.026,
                "poster_path": "/niVtvS9Kf8G1VDPSqurqHkaSSwm.jpg",
                "release_date": "2024-03-14",
                "title": "Art of Love",
                "video": false,
                "vote_average": 7.049,
                "vote_count": 61
              },
              {
                "adult": false,
                "backdrop_path": "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
                "genre_ids": [
                  878,
                  12
                ],
                "id": 438631,
                "original_language": "en",
                "original_title": "Dune",
                "overview": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
                "popularity": 368.536,
                "poster_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
                "release_date": "2021-09-15",
                "title": "Dune",
                "video": false,
                "vote_average": 7.789,
                "vote_count": 10903
              },
              {
                "adult": false,
                "backdrop_path": "/qz2QzkYzesbbL94rdUpZrFPhlRe.jpg",
                "genre_ids": [
                  10749,
                  35,
                  14
                ],
                "id": 1019420,
                "original_language": "en",
                "original_title": "Irish Wish",
                "overview": "Maddie's dream guy is days away from marrying her best friend when a wish for true love made on an ancient stone in Ireland magically alters her fate.",
                "popularity": 340.632,
                "poster_path": "/v4Bb70dpIIQoEnZAHnm3nzCPauU.jpg",
                "release_date": "2024-03-14",
                "title": "Irish Wish",
                "video": false,
                "vote_average": 6.345,
                "vote_count": 152
              },
              {
                "adult": false,
                "backdrop_path": "/4k46cQr1msDErfsEqZJVT10oKoH.jpg",
                "genre_ids": [
                  28,
                  53
                ],
                "id": 359410,
                "original_language": "en",
                "original_title": "Road House",
                "overview": "Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.",
                "popularity": 340.262,
                "poster_path": "/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg",
                "release_date": "2024-03-08",
                "title": "Road House",
                "video": false,
                "vote_average": 7,
                "vote_count": 274
              }
            ],
            "total_pages": 201,
            "total_results": 4010
          }
    }
}

export const movieData = new MovieData();
