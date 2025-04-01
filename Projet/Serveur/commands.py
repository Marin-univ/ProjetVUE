from .app import app, db

@app.cli.command('sync-db')
def init_db():
    db.create_all()