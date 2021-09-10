import CheckbosFilter from "./CheckboxFilter";

export default class SearchFilters {

  language = new CheckbosFilter('Idioma');

  author = new CheckbosFilter('Autor');

  publisher = new CheckbosFilter('Editora');

  genre = new CheckbosFilter('Gênero');
  
  publicDate = {
    name: 'Data de publicação',
    type: 'date',
    content: {
      start: null,
      end: null,
    },
  };

  /**
   * Generate the possible filters based on an arrays of books
   * @param {Book[]} books array of books that is used to make the filters
   */
  constructor(books) {
    if (books.length <= 1) {
      Object.entries(this).forEach(([key]) => delete this[key]);

    } else {
      books.forEach(book => {
        Object.entries(this).forEach(([key, value]) => {
          if (key != 'publicDate' && value.content[book[key]] != false) {
            if (typeof book[key] == 'object') value.content[book[key].description] = false;
            else value.content[book[key]] = false;
          }
        });
      });
  
      Object.entries(this).forEach(([key, value]) => {
        if (value.content.length <= 1) delete this[key];
      });
    }
  }

  /**
   * Filters an array of books based on the object filters
   * @param {Book[]} books array of books to be filtered
   * @returns the filtered array of books
   */
  filterBooks(books) {
    const filters = {}
    
    Object.entries(this).forEach(([key, value]) => {
      if (value.type == 'date') {
        filters[key] = value.content;

      } else if (value.type == 'checkbox') {
        let filter = [];
        Object.entries(value.content).forEach(([filterKey, filterValue]) => {
          if (filterValue) filter.push(filterKey);
        });
  
        if (filter.length > 0) filters[key] = filter;
      }
    });

    return books.filter(book => {
      let bookValid = true;

      Object.entries(filters).forEach(([key, value]) => {
        if (key == 'publicDate') {
          if (value.start) {
            if (Date.parse(book[key]) <= Date.parse(value.start)) {
              bookValid = false;
              return;
            }
          }

          if (value.end) {
            if (Date.parse(book[key]) >= Date.parse(value.end)) {
              bookValid = false;
              return;
            }
          }

        } else {
          let bookValue;

          if (typeof book[key] == 'object') bookValue = book[key].description;
          else bookValue = book[key];

          if (!value.includes(bookValue)) {
            bookValid = false;
            return;
          }
        }
      });

      return bookValid;
    });
  }
}
