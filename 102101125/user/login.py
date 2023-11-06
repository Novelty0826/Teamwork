from exts import db
from flask import  Blueprint,render_template,request
from models import Teacher,Course,Student
from flask import session,redirect
login = Blueprint("login", __name__, url_prefix='/')
def yanzheng(id,pwd):
    zh =Teacher.query.filter_by(teachername=id).filter_by(pwd=pwd).first()
    if zh==None:
        return 0
    else:
        return 1
    return 0
@login.route('/login',methods=['POST','GET'])
def log():
    if request.method == 'GET':
        return render_template('login.html')
    user = request.form.get('user')
    pwd = request.form.get('pwd')
    t= yanzheng(user,pwd)
    if t==0:
        error = '用户名或密码错误'
        return render_template('login.html', error=error)
    else:
        return redirect(f'/teacher/{user}')



