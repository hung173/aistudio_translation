const MENU_ITEMS = {
    IMPORT_FILE: {
        "id": 'import',
        "name": 'import'
    }
}

const OPTIONS = {
    instruction : "Dịch văn bản sau sang ngôn ngữ tiếng Việt, giữ nguyên vị trí các dòng và số thứ tự như văn bản gốc mà không thay đổi format. Dịch ngắn gọn và giữ nguyên ý nghĩa nội dung, đồng nhất tên các nhân vật, chuẩn văn phong truyện tranh hàn quốc, các tên nhân vật được dịch sang tên hàn quốc phiên âm quốc tế, phân biệt rõ giới tính ngôi thứ ba của nam và nữ: phân biệt rõ và sử dụng chính xác giữa cô ấy và anh ấy, hắn và ả, kết quả trả theo dạng mã khối",
    chunkSize : 100

}

Object.freeze(MENU_ITEMS);
Object.freeze(MENU_ITEMS.IMPORT_FILE);