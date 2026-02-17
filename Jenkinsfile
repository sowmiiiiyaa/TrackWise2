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
                    bat 'dir' // List contents of backend folder
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
                    bat 'dir' // List contents of frontend folder
                    bat 'echo "Frontend is static, no build needed"'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir('devtrack-backend') {
                    // Use PM2 if installed, otherwise fallback to node
                    bat 'pm2 restart index.js || pm2 start index.js || start cmd /k "node index.js"'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                dir('trackwise') {
                    bat 'start cmd /k "explorer ."' // Open folder for testing static frontend
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
