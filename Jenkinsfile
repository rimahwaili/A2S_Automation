pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'playwright-test:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker run --rm $DOCKER_IMAGE'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results/*', allowEmptyArchive: true
        }
        success {
            echo 'Tests réussis !'
        }
        failure {
            echo 'Certains tests ont échoué.'
        }
    }
}
