import { useEffect, useRef, useState } from 'react'
import '../style/App.css'
import { asyncGet, asyncPost, asyncDelete, asyncPatch } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'

function App() {
  const [students, setStudents] = useState<Array<Student>>([])
  const [newStudent, setNewStudent] = useState<Student>({
    _id: '',
    userName: '',
    sid: '',
    name: '',
    departmant: '',
    grade: '',
    class: '',
    Email: '',
    absences: 0
  })
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const cache = useRef<boolean>(false)

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body)
        }
      });
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [name]: value })
    } else {
      setNewStudent({ ...newStudent, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingStudent) {
      const res = await asyncPatch(`${api.update}?id=${editingStudent._id}`, { name: editingStudent.name })
      if (res.code === 200) {
        setStudents(students.map(student => student._id === editingStudent._id ? res.body : student))
        setEditingStudent(null)
      } else {
        alert('更新失敗：' + res.message)
      }
    } else {
      const res = await asyncPost(api.create, newStudent)
      if (res.code === 200) {
        setStudents([...students, res.body])
        setNewStudent({
          _id: '',
          userName: '',
          sid: '',
          name: '',
          departmant: '',
          grade: '',
          class: '',
          Email: '',
          absences: 0
        })
      } else {
        alert('新增失敗：' + res.message)
      }
    }
  }

  const handleDelete = async (id: string) => {
    const deleteUrl = `${api.delete}?id=${id}`
    try {
      const res = await asyncDelete(deleteUrl)
      if (res.code === 200) {
        setStudents(students.filter(student => student._id !== id))
      } else {
        alert('刪除失敗：' + res.message)
      }
    } catch (error) {
      console.error('刪除失敗：', error)
      alert('刪除失敗：無法連接到伺服器')
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
  }

  const studentsLists = students ? students.map((student: Student) => {
    return (
      <div className='student' key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.departmant}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.Email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
        <button onClick={() => handleEdit(student)}>編輯</button>
        <button onClick={() => handleDelete(student._id)}>刪除</button>
      </div>
    )
  }) : "loading"

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="帳號" value={editingStudent ? editingStudent.userName : newStudent.userName} onChange={handleInputChange} />
          <input type="text" name="sid" placeholder="座號" value={editingStudent ? editingStudent.sid : newStudent.sid} onChange={handleInputChange} />
          <input type="text" name="name" placeholder="姓名" value={editingStudent ? editingStudent.name : newStudent.name} onChange={handleInputChange} />
          <input type="text" name="departmant" placeholder="院系" value={editingStudent ? editingStudent.departmant : newStudent.departmant} onChange={handleInputChange} />
          <input type="text" name="grade" placeholder="年級" value={editingStudent ? editingStudent.grade : newStudent.grade} onChange={handleInputChange} />
          <input type="text" name="class" placeholder="班級" value={editingStudent ? editingStudent.class : newStudent.class} onChange={handleInputChange} />
          <input type="email" name="Email" placeholder="Email" value={editingStudent ? editingStudent.Email : newStudent.Email} onChange={handleInputChange} />
          <input type="number" name="absences" placeholder="缺席次數" value={editingStudent ? editingStudent.absences : newStudent.absences} onChange={handleInputChange} />
          <button type="submit">{editingStudent ? '更新' : '新增'}</button>
        </form>
        {studentsLists}
      </div>
    </>
  )
}

export default App