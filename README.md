### Install

```
pip install django djangorestframework django-cors-headers
```

### Run
(Tested using python 3.8) First, initialize the database:
```
cd apps
python manage.py migrate
```
Then run the server.
```
python manage.py runserver
```
Finally, go to localhost:8000 in your browser.
