pipeline {
  agent any

  /* ----- Global vars you might tweak ----- */
  environment {
    DOCKER_HUB_REPO = 'setu3011/smart-reminder'

    GIT_REPO   = 'https://github.com/Setu3011/Smart-Reminder.git'
    GIT_BRANCH = 'main'

    EC2_HOST   = '13.61.10.107'   /* Ubuntu EC2 public IP */
    REMOTE_DIR = 'smart-reminder' /* folder name on EC2 */
  }

  stages {

    /* 1️⃣  Checkout source */
    stage('Clone Repository') {
      steps {
        git branch: "${GIT_BRANCH}",
            url:    "${GIT_REPO}"
      }
    }

    /* 2️⃣  Install backend deps (package.json lives in backend/) */
    stage('Install Backend Dependencies') {
      steps {
        dir('backend') {
          sh 'npm install --omit=dev'
        }
      }
    }

    /* 3️⃣  Build & push images to Docker Hub */
  /*  stage('Build and Push Docker Images') {
      steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            set -e
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker compose build
            docker compose push
          '''
        }
      }
    } */
/* 3️⃣ Build & push images to Docker Hub */
stage('Build and Push Docker Images') {
  steps {
    withCredentials([
      usernamePassword(
        credentialsId: 'dockerhub-creds',   // <- make sure this ID exists
        usernameVariable: 'DOCKER_USER',
        passwordVariable: 'DOCKER_PASS'
      )
    ]) {

      sh """
        set -e

        # 1. Log in to Docker Hub (token recommended if you use 2FA)
        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin

        # 2. Build everything (frontend, backend, etc.)
        docker compose build

        # 3. Push every service image defined in docker‑compose.yml
        docker compose push

        # 4. (optional) log out to avoid leaving creds behind
        docker logout
      """
    }
  }
}


    
    /* 4️⃣  SSH to EC2 → pull latest code & run docker compose */
    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: ['ec2-ssh-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} << 'ENDSSH'
              set -e

              # clone once if missing
              if [ ! -d "${REMOTE_DIR}" ]; then
                git clone ${GIT_REPO} "${REMOTE_DIR}"
              fi

              cd "${REMOTE_DIR}"
              git pull origin ${GIT_BRANCH}

              # pull newest images & recreate containers
              docker compose pull
              docker compose up -d --build --remove-orphans
            ENDSSH
          """
        }
      }
    }
  }
}
