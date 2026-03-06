import { useEffect, useState } from 'react';
import api from '../service/api.js';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get('/').then(res => setMessage(res.data.message));
  });

  return (
    
    <div>
      <table>
        <thead>
          <tr>
            <th>Tên thành viên</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trương Mai Quốc Hoàng</td>
          </tr>
          <tr>
            <td>Trang Huỳnh Như Ý</td>
          </tr>
          <tr>
            <td>Huỳnh Thế Quang</td>
          </tr>
          <tr>
            <td>Nguyễn Đàm Thành Đạt</td>
          </tr>
          <tr>
            <td>Nguyễn Thái Bảo</td>
          </tr>
        </tbody>
      </table>
      <h1>{message}</h1>
    </div>
  )
}

export default App