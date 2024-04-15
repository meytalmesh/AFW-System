import subprocess
import sys

def start_container():
    try:
        project_code_path = r'C:\Users\orpaz\Downloads\CheckPoint'
        subprocess.run(['docker', 'run', '--name' ,'afw', '-p', '53508:53508/tcp' , '-d', '-v', '/home/admin/afw.cert:/container/path/afw.cert', '-v', f'{project_code_path}:/usr/src/app', 'dockerimage'], check=True)
        print("Container 'afw' started successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error starting container 'afw': {e}")

def stop_container():
    try:
        subprocess.run(['docker', 'stop', 'afw'], check=True)
        print("Container 'afw' stopped successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error stopping container 'afw': {e}")

def check_container_status():
    try:
        status = subprocess.check_output(['docker', 'inspect', '-f', '{{.State.Status}}', 'afw']).decode().strip()
        print(f"Container 'afw' status: {status}")
    except subprocess.CalledProcessError as e:
        print(f"Error checking container 'afw' status: {e}")
    except subprocess.CalledProcessError:
        print("Container 'afw' not found or failed to inspect.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python docker_script.py [start|stop|status]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "start":
        start_container()
    elif command == "stop":
        stop_container()
    elif command == "status":
        check_container_status()
    else:
        print("Invalid command. Please use 'start', 'stop', or 'status'.")

