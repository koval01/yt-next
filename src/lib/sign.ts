export class CustomHasher {
    private bufferSize: number;
    private prime1: number;
    private prime2: number;
    private prime3: number;
    private prime4: number;
    private sbox: number[];

    constructor() {
        this.bufferSize = 128;
        this.prime1 = 31;
        this.prime2 = 37;
        this.prime3 = 41;
        this.prime4 = 43;
        this.sbox = [
            0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5,
            0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76
        ];
    }

    public customHash(inputStr: string): string {
        const buffer = this._initializeBuffer(inputStr);
        this._performChaoticPermutations(buffer);
        this._finalPermutation(buffer);
        return this._convertToBase64(buffer);
    }

    private _initializeBuffer(inputStr: string): number[] {
        const buffer: number[] = new Array(this.bufferSize).fill(0);
        let dynamicKey = this.prime4;

        for (let i = 0; i < inputStr.length; i++) {
            buffer[i % this.bufferSize] = (
                buffer[i % this.bufferSize] + inputStr.charCodeAt(i) * this.prime1
            ) & 0xFF;
            buffer[(i + 1) % this.bufferSize] ^= (
                inputStr.charCodeAt(i) * this.prime2
            ) ^ dynamicKey;
            buffer[(i + 2) % this.bufferSize] = (
                (buffer[(i + 2) % this.bufferSize] + inputStr.charCodeAt(i) * this.prime3)
                & 0xFF
            ) ^ this.sbox[i % this.sbox.length];
            dynamicKey = (dynamicKey * this.prime2) & 0xFF;
        }

        return buffer;
    }

    private _performChaoticPermutations(buffer: number[]): void {
        for (let _r = 0; _r < 3; _r++) {
            for (let i = 0; i < buffer.length; i++) {
                // Left rotate
                buffer[i] = (
                    (buffer[i] << (i % 8)) | (buffer[i] >> (8 - (i % 8)))
                ) & 0xFF;

                // XOR with dynamic S-box and key
                buffer[i] ^= buffer[(i + this.prime1) % this.bufferSize] ^ this.sbox[
                    (i + this.prime4) % this.sbox.length
                ];

                buffer[i] = (
                    (buffer[i] + buffer[(i * 5 + _r) % this.bufferSize]) * this.prime1
                ) & 0xFF;
            }
            buffer.reverse();  // Reverse buffer for additional permutation
        }
    }

    private _finalPermutation(buffer: number[]): void {
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = this.sbox[buffer[i] % this.sbox.length] ^ buffer[
                (i * 7) % this.bufferSize
            ];
            buffer[i] ^= buffer[(i + this.prime3) % this.bufferSize];
        }
    }

    private _convertToBase64(buffer: number[]): string {
        // Convert buffer (array) to Uint8Array for binary data handling
        const uint8Array = new Uint8Array(buffer);

        // Convert to base64
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        // Use btoa to convert the binary string to a base64 encoded string
        const base64Str = btoa(binary);

        return base64Str.slice(0, 128);
    }
}
