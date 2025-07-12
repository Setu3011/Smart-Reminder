pipeline {
  agent any

  /* ---------- Global variables you might tweak ---------- */
  environment {
    /* Your Docker Hub image namespace */
    DOCKER_HUB_REPO = 'setu3011/smart-reminder'

    /* Git repo & branch (exact‑case!) */
    GIT_REPO   = 'https://github.com/Setu3011/Smart-Reminder.git'
    GIT_BRANCH = 'main'

    /* EC2 host you deploy to */
    EC2_HOST   = '13.61.10.107'     // <‑‑ change if needed
    REMOTE_DIR = 'smart-reminder'   // folder on EC2
  }

  stages {

    /* 1️⃣  Checkout the exact repo / branch */
    stage('Clone Repository') {
      steps {
        git branch: "${GIT_BRANCH}",
            url:    "${GIT_REPO}"
      }
    }

    /* 2️⃣  Install backend dependencies so the unit tests (if any) can run */
    stage('Install Backend Dependencies') {
      steps {
        dir('backend') {
          sh 'npm install --production'
        }
      }
    }

    /* 3️⃣  Build & push Docker images to Docker Hub */
    stage('Build and Push Docker Images') {
      steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker compose build
            docker compose push
          '''
        }
      }
    }

    /* 4️⃣  SSH into EC2 and run docker‑compose up */
    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: ['ec2-ssh-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} << 'ENDSSH'
              set -e
              # clone once if the folder doesn’t exist
              if [ ! -d "${REMOTE_DIR}" ]; then
                git clone https://github.com/Setu3011/Smart-Reminder.git "${REMOTE_DIR}"
              fi
              cd "${REMOTE_DIR}"
              git pull origin ${GIT_BRANCH}

              # pull newest images & recreate containers
              docker compose pull
              docker compose up -d --build --remove-orphans
            ENDSSH
          '''
        }
      }
    }
  }

  /* Optional: e‑mail on failure (remove if you don’t need) */
  post {
    failure {
      mail to: 'your_email@example.com',
           subject: "❌ Build failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body:    "See details: ${env.BUILD_URL}"
    }
  }
}
