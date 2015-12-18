import os
import tornado.httpserver
import tornado.ioloop
import tornado.web
from tornado.options import define, options

class UploadHandler(tornado.web.RequestHandler):
    def post(self):
        self.write("success!")

class StaticHandler(tornado.web.StaticFileHandler):
    def parse_url_path(self, path):
        if not path or path.endswith('/'):
            path = path + 'index.html'
        return path

if __name__ == "__main__":
    app = tornado.web.Application([
        (r"/upload", UploadHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path':os.path.join(os.getcwd(), 'static')})
    ])
    server = tornado.httpserver.HTTPServer(app)
    server.listen(5000)
    tornado.ioloop.IOLoop.instance().start()
