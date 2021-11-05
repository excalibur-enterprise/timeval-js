import isNode from 'detect-node';

export class Timeout
{
	private timeoutID: number | NodeJS.Timeout;

	constructor( private callback: () => void, private ms: number )
	{
		this.timeoutID = ( isNode )
			? setTimeout( callback, ms )
			: window.setTimeout( callback, ms );
	}

	public refresh(): void
	{
		if ( typeof this.timeoutID === 'number' )
		{
			window.clearTimeout( this.timeoutID );
			this.timeoutID = window.setTimeout( this.callback, this.ms );
		}
		else
		{
			this.timeoutID.refresh();
		}
	}

	public unref(): void
	{
		if ( typeof this.timeoutID !== 'number' )
		{
			this.timeoutID.refresh();
		}
	}

	public clear(): void
	{
		if ( typeof this.timeoutID === 'number' )
		{
			window.clearTimeout( this.timeoutID );
		}
		else
		{
			clearTimeout( this.timeoutID );
		}
	}
}
