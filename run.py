from flask import Flask,request,jsonify
from flask_restplus import Api, Resource, fields,Namespace
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



@api.route('/api/hello')
class HelloWorld(Resource):
    @jwt_required
    def get(self):
        response = jsonify({'hello':'world'})
        response.status_code = 200 
        
        current_user = get_jwt_identity()
        print(current_user)
        return response
@api.route('/api/login',methods=['POST'])
class Login(Resource):

    @api.response(200,'ok')
    @api.response(400,'err')
    @api.response(401,'err')
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



if __name__ == '__main__':
    #db.create_all()

    app.run(debug=True)