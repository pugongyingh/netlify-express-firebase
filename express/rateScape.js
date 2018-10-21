module.exports = function scrapeSelectBy() {
    return new Promise((resolve, reject) => {
      let list = [];
      const osmosis = require("osmosis");
  
      osmosis.config(
        "user_agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
      );
      osmosis.config("tries", 1);
      osmosis.config("concurrency", 2);
  
      osmosis
        .get("https://select.by/kurs/")
        .find(".module-kurs_nbrb:first tr:gt(1)")
        .set({
          currency: "td[1]",
          rate: "td[2]"
        })
        .data(data => {
          if (data.currency > "" && data.rate > "") {
            list.push(data);
          }
        })
        .error(err => reject(err))
        .done(() => resolve(list));
    });
  }
  