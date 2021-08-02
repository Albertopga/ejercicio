const relevantParams = [
  "arrival",
  "departure",
  "adults1",
  "children1",
  "locale",
  "currency",
  "nbNightsValue",
];

const getCurrencySymbol = document
  .getElementById("fb-headbar-block-currency")
  .children[1].textContent.split(" ")[0];

const countRoomsSerched = parseInt(
  document
    .getElementById("fb-qs-summary-rooms-quantity")
    .children[0].textContent.replace(/[\D]/g, "")
);

const getAccomodationResults = () => {
  return [...document.getElementById("results-items").children]
    .filter((element) => element.className.includes("accommodation"))
    .map((element, i = 0) => {
      return {
        index: i,
        element: element,
      };
    });
};

const minimunPricePerNight = (bookedNights) => {
  const prices = [];

  getAccomodationResults().forEach((offersForTheRoom) => {
    const index = offersForTheRoom.index;
    const summaryCards = {};
    // summaryCards is the container with the three offers of each room.
    // {0: Array(3)} --> 0: (3) [div, div, div]
    summaryCards[index] = [
      ...offersForTheRoom.element.lastElementChild.children,
    ];
    const offersPerCard = [
      ...summaryCards[index].map((child) => {
        return child.children;
      }),
    ]
      .map((priceCard) => priceCard[0])
      .map((section) => section.children[1]);

    offersPerCard.forEach((fbResultsRateRight, offerIndex) => {
      [...fbResultsRateRight.children[1].children].forEach((element) => {
        if (element.className.includes("new-price")) {
          price = element.children[0].attributes[1].textContent;
          pricePerNight = price / bookedNights;
          prices.push({
            summaryCardsId: offersForTheRoom.element.id,
            offerIndex: offerIndex,
            price: Math.round(pricePerNight * 100) / 100,
          });
        }
      });
    });
  });

  return prices.sort((a, b) => {
    let result = 0;
    a.price > b.price ? (result = 1) : (result = -1);
    return result;
  })[0];
};

const getOptionalInfo = (summaryCard) => {
  const { summaryCardsId, offerIndex } = summaryCard;
  let options = [];
  elementOptions = [
    ...document.getElementById(summaryCardsId).lastElementChild.children[
      offerIndex
    ].children[0].children[0].children[2].children[0].children,
  ];
  elementOptions.forEach((option) => {
    options.push(option.children[1].textContent);
  });
  return options;
};
/*I had doubts about the point where I should return the number of rooms searched, because I think it refers to
the number of results returned by the search, but at the last moment I think it is possible that it refers to the
number of rooms I need to book. This is the reason why I add one more field in the most relevan data object.*/

(start = () => {
  url = window.location.pathname;
  url =
    "index.php?s=results&group=ascentral&property=thphu18547&arrival=2021-08-01&departure=2021-08-06&adults1=2&children1=1&childrenAges1=2&locale=en_GB&currency=EUR&stid=ah67z4lsr&Clusternames=ascentral&cluster=ascentral&Hotelnames=Asia-Centara-Grand-Beach-Resort-Phuket&hname=Asia-Centara-Grand-Beach-Resort-Phuket&arrivalDateValue=2021-08-01&frommonth=8&fromday=1&fromyear=2021&nbdays=5&nbNightsValue=5&adulteresa=2&nbAdultsValue=2&enfantresa=1&nbChildrenValue=1&redir=BIZ-so5523q0o4&rt=1627658631";

  if (url.includes("?")) {
    let params = Object.fromEntries(
      url
        .split("?")[1]
        .split("&")
        .filter((param) => relevantParams.includes(param.split("=")[0]))
        .map((param) => param.split("="))
    );

    const relevantData = {
      "check-in": params["arrival"],
      "check-out": params["departure"],
      "minimun-price-night": `${
        minimunPricePerNight(params["nbNightsValue"]).price
      } ${getCurrencySymbol}`,
      currency: params["currency"],
      "rooms-returned": getAccomodationResults().length,
      "rooms-booked": countRoomsSerched,
      guests: {
        adults: params["adults1"],
        children: params["children1"],
        total: parseInt(params["adults1"]) + parseInt(params["children1"]),
      },
      "language-selected": params["locale"].split("_")[0],
    };

    if (
      getOptionalInfo(minimunPricePerNight(params["nbNightsValue"])).length > 0
    ) {
      relevantData["optional-services"] = getOptionalInfo(
        minimunPricePerNight(params["nbNightsValue"])
      );
    }

    return relevantData;
  } else {
    throw new Error("you not in booking page!");
  }
})();
