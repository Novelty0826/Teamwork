from flask import Blueprint, render_template, session, request, redirect
from exts import db
from models import Teacher,Course,Student
from flask import url_for

tea = Blueprint("teacher", __name__, url_prefix='/')





@tea.route('/teacher/<user>')
def index(user):
    results = Teacher.query.filter_by(teachername=user).first()
    print(results.course[0].cid)
    return render_template('teacher.html', result=results)


@tea.route('/teacher/course/<cname>')
def querycname(cname):
    result = Course.query.filter_by(cid=cname).first()
    print(result.sc[0].studentname)
    return render_template('course.html', courses=result)

@tea.route('/courseedit', methods=['GET', 'POST'])
def edit():
    cour = request.args.get('cour')
    id = request.args.get('id')
    late=request.args.get('late')
    if request.method == "GET":
        return render_template('course_edit.html',coursename=cour,id=id,late=late)
    course=request.form.get('coursename')
    studentname=request.form.get('studentname')
    latecount = request.form.get('latecount')
    cou =Course.query.filter_by(cid=course).first()
    icou=cou.id
    stu1=Student.query.filter_by(scid=icou).filter_by(studentname=studentname).first()
    stu1.latecount=latecount
    db.session.add(stu1)
    db.session.commit()
    return redirect('/login')

@tea.route('/delete')
def delete():
    cour = request.args.get('cour')
    id = request.args.get('id')
    late = request.args.get('late')
    cou =Course.query.filter_by(cid=cour).first()
    stu =Student.query.filter_by(scid=cou.id).filter_by(studentname=id).first()
    db.session.delete(stu)
    db.session.commit()
    return redirect(request.referrer)
