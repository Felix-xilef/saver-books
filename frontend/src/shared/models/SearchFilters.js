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
}
