from flask import Flask,request,jsonify
from flask_restplus import Api, Resource, fields,Namespace,marshal
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import(
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'localhost'
app.config['JWT_SECRET_KEY'] = 'qara-management-jwt-secretkey-topsecret'
jwt = JWTManager(app)

api = Api(app, version='1.0', title='Sample API',
    description='A sample API',
)

api_ns_JWS = api.namespace('JWS',description='JWS auth')
api_ns_TEST = api.namespace('TEST',description='Test namespace')
api_ns_Secure = api.namespace('Secure',description='Token required area')

cors = CORS(app,resources={
    "*":{"origin":"*"}
})
#db = SQLAlchemy(app)

def print_response(response):
    print("====response====")
    print(response.status)
    print(response.headers)
    print(response.get_data())
    print("================")

@api.route('/my-resource/<id>')
@api.doc(params={'id': 'An ID'})
class MyResource(Resource):
    
    def get(self, id):
        
        return {'id':id}

    @api.response(403, 'Not Authorized')
    def post(self, id):
        api.abort(403)

@api.route('/api/test')
class Test(Resource):
    def get(self):
        args = request.args
        print(args['uid'])
        return args['uid']



@api_ns_Secure.route('/api/hello')
class HelloWorld(Resource):
    @jwt_required
    def get(self):
        response = jsonify({'hello':'world'})
        response.status_code = 200 
        
        current_user = get_jwt_identity()
        print(current_user)
        return response

model_login = api.model('Login',{
    'username':fields.String(description='user name'),
    'password':fields.String(description='user password')
})


@api_ns_JWS.route('/api/login',methods=['POST'])
class Login(Resource):

    @api.response(200,'ok')
    @api.response(400,'err')
    @api.response(401,'err')
    @api.expect(model_login)
    def post(self):
        if not request.is_json:
            
            return jsonify({"msg": "Missing JSON in request"}, 400)

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        
        
        if not username:
            response = jsonify({"msg": "Missing username parameter"})
            response.status_code = 400
            return response
        if not password:
            response = jsonify({"msg": "Missing password parameter"})
            response.status_code = 400
            return response

        if username != 'test' or password != 'test':
            response = jsonify({"msg": "Bad username or password"})
            response.status_code = 401
            return response

        # Identity can be any data that is json serializable
        
        access_token = create_access_token(identity=username)
        response = jsonify(access_token=access_token)
        response.status_code = 200
        
        return response


model_todo = api.model('Todo', {
    'id': fields.Integer(readOnly=True, description='The task unique identifier'),
    'task': fields.String(required=True, description='The task details')
})


class TodoDAO(object):
    def __init__(self):
        self.counter = 0
        self.todos = []

    def get(self, id):
        for todo in self.todos:
            if todo['id'] == id:
                return todo
        api.abort(404, "Todo {} doesn't exist".format(id))

    def create(self, data):
        todo = data
        todo['id'] = self.counter = self.counter + 1
        self.todos.append(todo)
        return todo

    def update(self, id, data):
        todo = self.get(id)
        todo.update(data)
        return todo

    def delete(self, id):
        todo = self.get(id)
        self.todos.remove(todo)


DAO = TodoDAO()
DAO.create({'task': 'Build an API'})
DAO.create({'task': '?????'})
DAO.create({'task': 'profit!'})

@api.route('/todo')
class TodoList(Resource):
    @api.doc('list_todos~~~!!!')
    @api.marshal_list_with(model_todo)
    def get(self):
        return DAO.todos
    
    @api.doc('create_todo')
    @api.expect(model_todo)
    @api.marshal_with(model_todo, code=201)
    def post(self):
        '''Create a new task'''
        r  =  DAO.create(api.payload)        
        return r, 201


if __name__ == '__main__':
    #db.create_all()

    app.run(debug=True)