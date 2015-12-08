DATE = $(shell date)
.PHONY: run test upload

create:
	./run create

update:
	./run update

delete:
	./run delete

test:
	./test

upload:
	./upload

portrait:
	@echo "first_last:"
	@read REPLY; \
	mkdir -p portraits/$$REPLY && \
	cp -f index.html portraits/$$REPLY/index.html

release:
	@echo "Commit message:"
	@read REPLY; \
	echo "${DATE} - $$REPLY" >> CHANGELOG && \
	git add --all && \
	git commit -m "$$REPLY" && \
	git push