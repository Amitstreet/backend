import Book from '../Modal/books_modal.js'

// Search by keyword controller
export const searchByKeyword = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const books = await Book.find({
      $or: [
        { bookname: { $regex: keyword, $options: 'i' } },
        { writer: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search by category controller
export const searchByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const books = await Book.find({ catogery: { $regex: category, $options: 'i' } });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
