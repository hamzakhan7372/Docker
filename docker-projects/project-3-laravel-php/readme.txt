docker-compose run --rm --build composer create-project --prefer-dist laravel/laravel .
docker-compose up --build server      // --build will froce to check and see if a new image needs to be build.
docker compose run --rm artisan migrate 