pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sowmiiiiyaa/TrackWise2.git',
                    credentialsId: 'github-jenkins'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('devtrack-backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('devtrack-backend') {
                    bat 'echo "Skipping backend tests"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('trackwise') {
                    bat 'echo "Frontend is static, skipping build"'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed, check console output!'
        }
    }
}
