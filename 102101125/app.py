from flask import Flask,render_template,request,session,redirect
from flask import url_for
from user.teacher import tea
import functools
import pymysql
import config
from exts import db
from models import Teacher,Course,Student
from flask_migrate import Migrate
from user.login import login
from user.reg import reg



app = Flask(__name__)
app.config.from_object(config)
app.secret_key='123123'
app.register_blueprint(tea)
app.register_blueprint(login)
app.register_blueprint(reg)


db.init_app(app)

migrate=Migrate(app,db)
# s=teachers(teacher_id='kx',course='计算机组成原理')
# db.session.add(s)
# db.session.commit()

def auth(func):
    @functools.wraps(func)
    def inner(*args,**kwargs):
        username = session.get('xxx')
        if not username:
            return redirect(url_for('login'))
        return func(*args,**kwargs)
    return inner

@app.route('/add',methods=['POST','GET'])
def add():
    if request.method=='GET':
        return render_template('add.html')
    teachername=request.form.get('teachername')
    coursename = request.form.get('coursename')
    studentname = request.form.get('studentname')
    studentid = request.form.get('studentid')
    stugender = request.form.get('stugender')
    latecount = request.form.get('latecount')
    tche=Teacher.query.filter_by(teachername=teachername)
    if tche ==None:
        tea =Teacher(teachername=teachername)
        db.session.add(tea)
        db.session.commit()
    tc=Teacher.query.filter_by(teachername=teachername).first()
    if tc==None:
        cou=Course(cid=coursename,tid=tc.id)
        db.session.add(cou)
        db.session.commit()
    cs=Course.query.filter_by(cid=coursename).first()
    stu=Student(studentname=studentname,student_gender=stugender,student_id=studentid,scid=cs.id,latecount=latecount)
    db.session.add(stu)
    db.session.commit()
    return redirect('/login')



@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
