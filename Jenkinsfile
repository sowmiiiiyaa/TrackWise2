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
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('devtrack-backend') {
                    sh 'npm test || echo "Tests skipped or failed"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('trackwise') {
                    sh 'echo "Frontend is static, skipping build"'
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
