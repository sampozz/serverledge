import function

def test_ffmpeg():
    # Mock parameters
    params = {
        'input': 'video.mp4',
    }
    
    # Mock context (if needed)
    context = None
    
    # Call the function
    result = function.handler(params, context)
    
    # Check the result
    assert result == True, "Function did not return True"
    
    print("Test passed!")


if __name__ == "__main__":
    test_ffmpeg()