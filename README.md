# Software Engineering Project

## Docker Engine and Docker Compose

### Setting up the environment

* Install **Docker Engine** from this link: https://docs.docker.com/engine/install/
* Install **Docker Compose** from this link: https://docs.docker.com/compose/install/
* Run the Docker Engine (depends on your OS, can be automatic or manual)
* Download this project and unzip it in your working folder

### Run your project with docker-compose step by step

* Open a Terminal

* Go to your Working Folder

![](./README_assets/Console.png)


* Type following Commands

* Build all services of `docker-compose`: 

  ```shell
  docker-compose build
  ```

* Start all services of `docker-compose`: 

  ```shell
  docker-compose up
  ```

Check documentation for more details : https://docs.docker.com/compose/gettingstarted/

## This project

<span style="color:red">For this project, `docker-compose up` will create a folder named `db_data`. **DO NOT REMOVE** this folder because it will contain all your database content.</span> 

### `docker-compose` services

| Project      | Image docker       | Exposed port         |
| ------------ | ------------------ | -------------------- |
| `mysql`      | `mysal:5.6`        | `4000` &rarr; `3306` |
| `phpmyadmin` | `phpmyadmin:5.1.1` | `4001` → `80`        |
| `backend`    | `node:12`          | `4100` → `4100`      |
| `frontend`   | `httpd:2.4.51`     | `4200` → `80`        |

### `mysql` instance

* MySQL superuser: `root`
* MySQL superuser password: `root` (`MYSQL_ROOT_PASSWORD` environment variable)
* MySQL database name: `mydatabase` (`MYSQL_DATABASE` environment variable)

### `phpmyadmin` instance

* After running `docker-compose up --build` command, open your browser and navigate to URL http://localhost:4001 to open *phpMyAdmin login page*
* Use `superuser` account credentials:

![](./README_assets/screenshot1.png)

* In the left column, select the `mydatabase` database to start

![](./README_assets/screenshot2.png)
