from exts import db


class Teacher(db.Model):
    __tablename__="teacher"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    teachername=db.Column(db.String(100),nullable=False)
    pwd=db.Column(db.String(100),nullable=False)
    course=db.relationship("Course",backref="course")

class Course(db.Model):
    __tablename__ = "course"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cid = db.Column(db.String(100),nullable=False)
    tid=db.Column(db.Integer,db.ForeignKey("teacher.id"))
    sc=db.relationship("Student",backref="stucourse")

class Student(db.Model):
    __table__name="student"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    studentname = db.Column(db.String(100), nullable=False)
    student_gender = db.Column(db.Enum("男","女"), nullable=False)
    student_id = db.Column(db.String(100), nullable=False)
    scid=db.Column(db.Integer,db.ForeignKey("course.id"))
    latecount=db.Column(db.Integer)






