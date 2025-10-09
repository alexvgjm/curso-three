// 

interface TweenParams {
    from: number
    to: number
    duration: number
    timingFunction?: 'linear' | 'easeOut'
    onUpdate: (value: number) => void
}

const TIMING_FUNCTIONS = {
    linear: (t: number) => t,
    easeOut: (t: number) => t * (2 - t),
}

export class Tween {
    from: number
    to: number
    duration: number
    onUpdate: (value: number) => void
    elapsed: number = 0
    timing: (t: number) => number

    constructor(params: TweenParams) {
        this.from = params.from
        this.to = params.to
        this.duration = params.duration
        this.onUpdate = params.onUpdate
        this.timing = TIMING_FUNCTIONS[params.timingFunction ?? 'easeOut']
    }

    update(delta: number) {
        this.elapsed += delta
        let t = Math.min(this.elapsed / this.duration, 1) // 0..1
        t = this.timing(t)
        const value = this.from + (this.to - this.from) * t
        this.onUpdate(value)
    }
}