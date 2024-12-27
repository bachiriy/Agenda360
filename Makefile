run:
	cd ./app && ng serve

push: commit
	git push

commit: add
	git commit -m "$(M)"

add: pull
	git add .

pull: fetch
	git pull

fetch:
	git fetch
