# Frontend test

Visit one of the following hotels and search for a room to stay with your partner and child during
your next holidays:

- https://www.condadohotel.com
- https://www.petitermitage.com
- https://www.arcotel-starchampselysees.com
- [x] https://www.centarahotelsresorts.com/centaragrand/cpbr

You are free to choose any hotel from the list above, but there are two requirements for the search:

1. The results should contain several rooms (or rates) for you to select
2. The stay must be for several nights

Stay on the results page (availability page) and do not proceed to the booking.

Your task is to craft a JavaScript function that detects and returns the most relevant data of the
availability page. When the function is executed in that page, it should return an object with the
following information:

- [x] The check-in date in yyyy-mm-dd format
- [x] The check-out date in yyyy-mm-dd format
- [x] The minimum price (expressed per night) offered by the hotel
- [x] The currency of that price (three characters ISO code)
- [x] The number of rooms the user searched for
- [x] The number of guests the user searched for (split adults from children)
- [x] The total amount of guests
- [x] The language used (two letters code)
- [] Optionally you may add
  - [x] Extra data for that minimum price (for instance if it is a refundable rate, includes
        breakfast, etc).
  - [] A complete list of rates shown by the page (with their details, as capacity, etc).

You are free to choose property names for all that information, just make it as comprehensible
as you can.

When the function is executed in a page that is not the Availability Page (for example:
Homepage) it should retrieve an error
