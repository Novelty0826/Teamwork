from exts import db
from flask import Blueprint, render_template, request
from models import Teacher, Course, Student
from flask import session, redirect

reg = Blueprint("reg", __name__, url_prefix='/')


@reg.route('/reg',methods=['POST','GET'])
def reg():
    if request.method == 'GET':
        return render_template('reg.html')

