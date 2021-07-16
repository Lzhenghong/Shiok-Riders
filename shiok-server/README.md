1. Run `rm -rf .git`
2. `heroku login`
3. `git init`
4. `heroku git:remote -a ${YOUR APP NAME}`
5. `git add .`
6. `git commit -am "initial commit"`
7. `git push heroku master`