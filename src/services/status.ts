export class StatusService{
	private availablility = false;

	setAvailable(){
		this.availablility = true;
	}

	setUnavailable(){
		this.availablility = false;
	}
}
