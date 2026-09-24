<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // GET: Lấy danh sách tất cả sách
    public function index()
    {
        $books = Book::all();
        return response()->json([
            'status' => 'success',
            'data' => $books
        ], 200);
    }

    // POST: Thêm một cuốn sách mới
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
        ]);

        $book = Book::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Thêm sách thành công',
            'data' => $book
        ], 201);
    }

    // GET: Lấy thông tin chi tiết 1 cuốn sách theo ID
    public function show($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sách'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $book
        ], 200);
    }

    // PUT: Cập nhật/sửa thông tin sách
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sách'
            ], 404);
        }

        $book->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật sách thành công',
            'data' => $book
        ], 200);
    }

    // DELETE: Xóa sách theo ID
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy sách'
            ], 404);
        }

        $book->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Xóa sách thành công'
        ], 200);
    }
}