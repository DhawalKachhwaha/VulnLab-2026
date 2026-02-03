## Quick Start

You do not need to install Node.js, MySQL, or Nginx manually. The entire lab runs inside a single Docker container.

### Prerequisites

* **Docker** must be installed on your machine.
* *Linux (Ubuntu):* `sudo apt install docker.io`
* *Windows/Mac:* Install Docker Desktop.



---

### How to Run

1. **Download the Image**
Go to the Releases page of this repository and download `vulnlab_image.tar`.
2. **Load the Image**
Open your terminal in the folder where you downloaded the file and run:
```bash
docker load -i vulnlab_image.tar

```


3. **Start the Lab**
Run the following command to start the server:
```bash
docker run -d -p 8080:80 --name vulnlab_instance vulnlab

```


4. **Access the Application**
Open your browser and navigate to:
**http://localhost:8080**

---

### Management Commands

**Stop the lab:**

```bash
docker stop vulnlab_instance

```

**Start it again:**

```bash
docker start vulnlab_instance

```

**Reset the database (Wipe clean):**

```bash
docker rm -f vulnlab_instance
docker run -d -p 8080:80 --name vulnlab_instance vulnlab

```

