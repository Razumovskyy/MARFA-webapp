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

## Project links

- **Web application:** [marfa.app](https://marfa.app/)
- **Published paper:** [M. Razumovskiy, B. Fomin, and D. Astanin, “MARFA: An effective line-by-line tool for calculating molecular absorption in planetary atmospheres,” JQSRT 346 (2025), 109599](https://doi.org/10.1016/j.jqsrt.2025.109599)
- **Canonical development repository:** [GitLab — venusrt/marfa/marfa-webapp](https://gitlab.com/venusrt/marfa/marfa-webapp)
- **Public source mirror:** [GitHub — Razumovskyy/MARFA-webapp](https://github.com/Razumovskyy/MARFA-webapp)

## Repository status and collaboration

Development, code review, issue triage, and CI/CD are managed in the canonical GitLab repository. The GitHub repository is maintained as a public source mirror so that the code remains easy to discover, inspect, and fork. Changes to the default branch are integrated through GitLab rather than merged directly into the mirror.

Scientific and software collaboration is welcome. If you would like to implement a feature, contribute code, or use MARFA-webapp in a joint project, please contact [Mikhail Razumovskiy](https://github.com/Razumovskyy) at [mrazumovskyy@gmail.com](mailto:mrazumovskyy@gmail.com) before beginning substantial work. We can agree on the scope and arrange access to the canonical GitLab project. GitHub pull requests may also be used as initial proposals and will be transferred to GitLab for review and integration.

## Architecture

The [web interface](https://marfa.app/) provides direct access to the MARFA atmospheric absorption calculator. The client is built with Next.js, while the server uses Django and Django REST Framework. The frontend and backend communicate through a REST API; Nginx serves HTTP traffic, and PostgreSQL stores information about user requests.

The backend invokes MARFA's Fortran executables through Python's `subprocess` module. This keeps the Fortran calculation layer separate from the Python web layer. Completed calculations generate PT-table files on the server, which are processed and exposed to users through download links. The frontend, backend, and calculation components run in Docker containers, and deployments are managed through the GitLab CI/CD pipeline.

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
