<div style="display: flex; justify-content: center">
    <img width="300" src="./interface/src/images/MarkLogo.svg"/>
</div>
<div style="display: flex; flex-direction: column; align-items: center">

# MARFA

Molecular atmospheric Absorption with Rapid and Flexible Analysis
</div>

MARFA (Molecular atmospheric Absorption with Rapid and Flexible Analysis) is a versatile tool designed to calculate
volume absorption coefficients or monochromatic absorption cross-sections using initial spectroscopic data from spectral
databases and atmospheric data from an external file.

A <a href="https://marfa.app">web interface</a> accessible at <a href="https://marfa.app">marfa.app</a> has been
developed
enabling an immediate interaction with MARFA atmospheric absorption calculator. The client side is built using the
Next.js framework, which supports server-side rendering to ensure quick site loading. On the server
side, Django and Django Rest Framework backend frameworks are
utilized — a highly scalable and extensible tool-kits, that offer robust built-in database support mechanisms and
functionality for building Web APIs. Thus, the client and server communicate through a REST API, enabling fast and
seamless data exchange. For the HTTP web server, Nginx is used, while PostgreSQL
is used as a primary database for storing information about users requests.

Integration between the backend and MARFA's Fortran core is achieved by leveraging Django's ViewSet to invoke
external processes via Python's subprocess module python_subprocess. This was chosen instead of
f2py module from the Numpy, becuase it was a need to separate Fortran and python layers of
the application. These processes run fpm executables essential for MARFA's calculations. Upon completion, the Fortran
code generates the resulting PT-tables files, which are stored on the server. After these files are processed, they are
provided to the client with download links, allowing users to access their results. Frontend and backend parts of the
application are hosted within docker containers, and the
application source code is equipped with GitHub Actions CI/CD pipeline for automatic
deployments to the server.

## 1. Installing Fortran

For installing the `gfortran` you can use [GNU Fortran website](https://gcc.gnu.org/fortran/) or use your system's
package manager.
Installation instructions ara available on the [official website](https://fpm.fortran-lang.org/install/index.html) or on
the [fpm github page](https://github.com/fortran-lang/fpm).

## 2. Setting Up and Running the Backend Application

2.1. Navigate to the "api-server" Directory

```shell
cd .\api-server
```

2.2. Create a Virtual Environment

```shell
python -m venv venv
```

2.3. Activate the Virtual Environment

```shell
.\venv\Scripts\Activate.ps1
```

2.4. Install Required Packages:

```shell
pip install -r .\requirements.txt
```

2.5. Set Up the Database

```shell
python manage.py makemigrations
python manage.py migrate
```

2.6. Run the Backend Application

```shell
python manage.py runserver
```

After execution this commands, server is running with url - "http://127.0.0.1:8000"

## 3. Setting Up and Running the Frontend Application

3.1 Navigate to the interface Directory

```shell
cd .\interface\
```

3.2. Install Dependencies

```shell
npm i -f
```

3.3. Run the Frontend Application

```shell
npm run dev
```

After execution this commands, frontend is running with url - "http://localhost:3000"
